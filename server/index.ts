export {};
import fs from 'node:fs';
import http, { IncomingMessage, ServerResponse } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  experience: string;
  schedule: string;
  price: number;
  rating: number;
  badge: string;
  description: string;
}

interface UserRecord {
  id: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  address: string;
  interests: string[];
}

interface OrderItemRecord {
  id: number;
  name: string;
  price: number;
}

interface OrderRecord {
  id: string;
  userId: string;
  items: OrderItemRecord[];
  createdAt: string;
}

interface AppData {
  users: UserRecord[];
  orders: OrderRecord[];
}

type JsonObject = Record<string, unknown>;

const PORT = Number(process.env.PORT || 4000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'data.json');

const staffCatalog: StaffMember[] = [
  {
    id: 1,
    name: 'Анна Волкова',
    role: 'Домработница',
    experience: '6 лет опыта',
    schedule: 'Пн - Пт',
    price: 140,
    rating: 4.9,
    badge: 'Частый выбор',
    description: 'Генеральная уборка, уход за гардеробом и поддержание порядка каждый день.',
  },
  {
    id: 2,
    name: 'Мария Соколова',
    role: 'Няня',
    experience: '8 лет опыта',
    schedule: 'Гибкий график',
    price: 180,
    rating: 5,
    badge: 'Семейный фаворит',
    description: 'Заботливый специалист по уходу за детьми, режиму дня и развивающим занятиям.',
  },
  {
    id: 3,
    name: 'Илья Карпов',
    role: 'Личный повар',
    experience: '10 лет опыта',
    schedule: 'Вечера и выходные',
    price: 220,
    rating: 4.8,
    badge: 'Домашнее меню',
    description: 'Приготовление еды на неделю, семейные ужины и меню с учётом предпочтений.',
  },
  {
    id: 4,
    name: 'Ольга Руднева',
    role: 'Сиделка',
    experience: '7 лет опыта',
    schedule: 'Смены 24/7',
    price: 200,
    rating: 4.9,
    badge: 'Надёжная помощь',
    description: 'Домашний уход, сопровождение, напоминание о лекарствах и поддержка пожилых.',
  },
  {
    id: 5,
    name: 'Даниил Бровкин',
    role: 'Садовник',
    experience: '5 лет опыта',
    schedule: 'Вт - Сб',
    price: 110,
    rating: 4.7,
    badge: 'Уход за участком',
    description: 'Сезонный уход за садом, террасой и придомовой территорией.',
  },
  {
    id: 6,
    name: 'София Ланская',
    role: 'Управляющая домом',
    experience: '9 лет опыта',
    schedule: 'Полная занятость',
    price: 260,
    rating: 4.9,
    badge: 'Премиум',
    description: 'Организует быт, подрядчиков, расписание семьи и ежедневные домашние процессы.',
  },
];

const seedData: AppData = {
  users: [
    {
      id: '1',
      email: 'client@homestaff.com',
      password: 'demo123',
      role: 'client',
      phone: '+7 (999) 123-45-67',
      address: 'Москва, Пресненская набережная, 12',
      interests: ['Няня', 'Домработница'],
    },
  ],
  orders: [],
};

const ensureDataFile = (): void => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(seedData, null, 2), 'utf8');
  }
};

const readData = (): AppData => {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(raw) as AppData;
};

const writeData = (data: AppData): void => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

const sendJson = (res: ServerResponse, statusCode: number, payload: unknown): void => {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(payload));
};

const readBody = (req: IncomingMessage): Promise<JsonObject> =>
  new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk: Buffer | string) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body) as JsonObject);
      } catch (error) {
        reject(error);
      }
    });

    req.on('error', reject);
  });

const asTrimmedString = (value: unknown): string =>
  typeof value === 'string' ? value.trim() : '';

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === 'string');

const serializeUser = (user: UserRecord) => ({
  id: user.id,
  email: user.email,
  role: user.role,
  phone: user.phone,
  address: user.address,
  interests: user.interests,
});

const getAuthUser = (req: IncomingMessage): UserRecord | null => {
  const { users } = readData();
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer demo-token-')) {
    return null;
  }

  const userId = authHeader.replace('Bearer demo-token-', '');
  return users.find((user) => user.id === userId) || null;
};

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'OPTIONS') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/health') {
    sendJson(res, 200, { ok: true, service: 'home-staff-api' });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/staff') {
    sendJson(res, 200, { items: staffCatalog });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/login') {
    try {
      const { users } = readData();
      const body = await readBody(req);
      const normalizedEmail = asTrimmedString(body.email).toLowerCase();
      const normalizedPassword = asTrimmedString(body.password);

      const user = users.find(
        (item) => item.email.toLowerCase() === normalizedEmail && item.password === normalizedPassword,
      );

      if (!user) {
        sendJson(res, 401, { message: 'Неверная почта или пароль.' });
        return;
      }

      sendJson(res, 200, {
        token: `demo-token-${user.id}`,
        user: serializeUser(user),
      });
    } catch {
      sendJson(res, 400, { message: 'Некорректное тело запроса.' });
    }
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/register') {
    try {
      const data = readData();
      const body = await readBody(req);
      const normalizedEmail = asTrimmedString(body.email).toLowerCase();
      const normalizedPassword = asTrimmedString(body.password);
      const normalizedPhone = asTrimmedString(body.phone);
      const normalizedAddress = asTrimmedString(body.address);
      const interests = isStringArray(body.interests) ? body.interests : [];

      if (!normalizedEmail || !normalizedPassword || !normalizedPhone || !normalizedAddress) {
        sendJson(res, 400, { message: 'Заполните почту, пароль, телефон и адрес.' });
        return;
      }

      if (interests.length === 0) {
        sendJson(res, 400, { message: 'Выберите хотя бы одну интересующую услугу.' });
        return;
      }

      const alreadyExists = data.users.some((item) => item.email.toLowerCase() === normalizedEmail);
      if (alreadyExists) {
        sendJson(res, 409, { message: 'Пользователь с такой почтой уже существует.' });
        return;
      }

      const nextUser: UserRecord = {
        id: String(data.users.length + 1),
        email: normalizedEmail,
        password: normalizedPassword,
        role: 'client',
        phone: normalizedPhone,
        address: normalizedAddress,
        interests,
      };

      data.users.push(nextUser);
      writeData(data);

      sendJson(res, 201, {
        token: `demo-token-${nextUser.id}`,
        user: serializeUser(nextUser),
      });
    } catch {
      sendJson(res, 400, { message: 'Некорректное тело запроса.' });
    }
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/dashboard') {
    const authUser = getAuthUser(req);
    const { orders } = readData();

    if (!authUser) {
      sendJson(res, 401, { message: 'Нужна авторизация.' });
      return;
    }

    const userOrders = orders.filter((order) => order.userId === authUser.id);
    sendJson(res, 200, {
      summary: {
        activeOrders: userOrders.length,
        favoriteCategory: userOrders[0]?.items[0]?.name || 'Няни и домработницы',
        responseTime: '24 часа',
      },
    });
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/orders') {
    const authUser = getAuthUser(req);
    const { orders } = readData();

    if (!authUser) {
      sendJson(res, 401, { message: 'Нужна авторизация.' });
      return;
    }

    sendJson(res, 200, {
      orders: orders.filter((order) => order.userId === authUser.id),
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/orders') {
    const authUser = getAuthUser(req);

    if (!authUser) {
      sendJson(res, 401, { message: 'Нужна авторизация.' });
      return;
    }

    try {
      const data = readData();
      const body = await readBody(req);
      const items = Array.isArray(body.items) ? (body.items as OrderItemRecord[]) : [];

      if (items.length === 0) {
        sendJson(res, 400, { message: 'Добавьте услуги в заявку.' });
        return;
      }

      const order: OrderRecord = {
        id: `order-${data.orders.length + 1}`,
        userId: authUser.id,
        items,
        createdAt: new Date().toISOString(),
      };

      data.orders.push(order);
      writeData(data);

      sendJson(res, 201, {
        message: 'Заявка отправлена. Менеджер свяжется с вами в ближайшее время.',
        order,
      });
    } catch {
      sendJson(res, 400, { message: 'Некорректное тело запроса.' });
    }
    return;
  }

  if (req.method === 'PUT' && url.pathname === '/api/profile') {
    const authUser = getAuthUser(req);

    if (!authUser) {
      sendJson(res, 401, { message: 'Нужна авторизация.' });
      return;
    }

    try {
      const data = readData();
      const body = await readBody(req);
      const phone = asTrimmedString(body.phone);
      const address = asTrimmedString(body.address);
      const userIndex = data.users.findIndex((user) => user.id === authUser.id);

      if (userIndex === -1) {
        sendJson(res, 404, { message: 'Пользователь не найден.' });
        return;
      }

      data.users[userIndex] = {
        ...data.users[userIndex],
        phone: phone || data.users[userIndex].phone,
        address: address || data.users[userIndex].address,
      };

      writeData(data);
      sendJson(res, 200, {
        token: `demo-token-${data.users[userIndex].id}`,
        user: serializeUser(data.users[userIndex]),
      });
    } catch {
      sendJson(res, 400, { message: 'Некорректные данные профиля.' });
    }
    return;
  }

  if (req.method === 'PATCH' && url.pathname === '/api/profile/interests') {
    const authUser = getAuthUser(req);

    if (!authUser) {
      sendJson(res, 401, { message: 'Нужна авторизация.' });
      return;
    }

    try {
      const data = readData();
      const body = await readBody(req);
      const interests = isStringArray(body.interests) ? body.interests : [];
      const userIndex = data.users.findIndex((user) => user.id === authUser.id);

      if (interests.length === 0) {
        sendJson(res, 400, { message: 'Выберите хотя бы одну услугу.' });
        return;
      }

      if (userIndex === -1) {
        sendJson(res, 404, { message: 'Пользователь не найден.' });
        return;
      }

      data.users[userIndex] = {
        ...data.users[userIndex],
        interests,
      };

      writeData(data);
      sendJson(res, 200, {
        token: `demo-token-${data.users[userIndex].id}`,
        user: serializeUser(data.users[userIndex]),
      });
    } catch {
      sendJson(res, 400, { message: 'Некорректные предпочтения.' });
    }
    return;
  }

  if (req.method === 'DELETE' && url.pathname.startsWith('/api/orders/')) {
    const authUser = getAuthUser(req);

    if (!authUser) {
      sendJson(res, 401, { message: 'Нужна авторизация.' });
      return;
    }

    const data = readData();
    const orderId = url.pathname.replace('/api/orders/', '');
    const orderIndex = data.orders.findIndex(
      (order) => order.id === orderId && order.userId === authUser.id,
    );

    if (orderIndex === -1) {
      sendJson(res, 404, { message: 'Заявка не найдена.' });
      return;
    }

    data.orders.splice(orderIndex, 1);
    writeData(data);
    sendJson(res, 200, { message: 'Заявка удалена.' });
    return;
  }

  sendJson(res, 404, { message: 'Route not found.' });
});

server.listen(PORT, () => {
  console.log(`Home Staff API running on http://localhost:${PORT}`);
});
