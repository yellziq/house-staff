'use client';

import type { ReactElement } from 'react';

import { observer } from 'mobx-react-lite';
import type { StaffMember } from '@entities/staff/model';
import { formatPrice } from '@shared/lib/formatters';
import { rootStore } from '@shared/store/rootStore';
import { Button } from '@shared/ui/Button';

interface StaffCardProps {
  member: StaffMember;
}

export const StaffCard = observer(({ member }: StaffCardProps): ReactElement => {
  const { cartStore, uiStore } = rootStore;

  const handleAdd = (): void => {
    cartStore.add({
      id: member.id,
      name: `${member.role}: ${member.name}`,
      price: member.price,
    });
    uiStore.setMessage(`${member.name} добавлен в корзину.`);
  };

  return (
    <article className="staff-card">
      <div className="staff-card-top">
        <span className="badge">{member.badge}</span>
        <span className="rating">{member.rating.toFixed(1)} / 5</span>
      </div>
      <h3>{member.name}</h3>
      <p className="staff-role">{member.role}</p>
      <p className="staff-description">{member.description}</p>
      <div className="staff-meta">
        <span>{member.experience}</span>
        <span>{member.schedule}</span>
      </div>
      <div className="staff-card-footer">
        <div>
          <strong>{formatPrice(member.price)}</strong>
          <p>за выход / смену</p>
        </div>
        <Button onClick={handleAdd}>В корзину</Button>
      </div>
    </article>
  );
});
