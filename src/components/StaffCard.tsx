import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../ui/Button';
import type { StaffMember } from '../data/staffCatalog';
import { cartSlice } from '../store/slices/cartSlice';
import { settingsSlice } from '../store/slices/settingsSlice';
import { formatPrice } from '../utils/formatters';

interface StaffCardProps {
  member: StaffMember;
}

export const StaffCard: React.FC<StaffCardProps> = ({ member }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(
      cartSlice.actions.addToCart({
        id: member.id,
        name: `${member.role}: ${member.name}`,
        price: member.price,
      }),
    );
    dispatch(settingsSlice.actions.setError(`${member.name} добавлен в корзину.`));
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
        <Button label="В корзину" onClick={handleAdd} />
      </div>
    </article>
  );
};
