// SelectPlan.jsx
import { useNavigate, useLocation } from 'react-router-dom';

const plans = [
  { name: 'Basic', price: 10, features: ['Gym access'] },
  { name: 'Advanced', price: 20, features: ['Gym + Cardio', 'Trainer'] },
  { name: 'Elite', price: 30, features: ['All access + Diet Plan'] },
];

function SelectPlan() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handlePlanSelect = (plan) => {
    navigate('/payment', {
      state: { ...state, plan },
    });
  };

  return (
    <div>
      <h2>Select Your Plan</h2>
      {plans.map((plan) => (
        <div key={plan.name}>
          <h3>{plan.name} - ${plan.price}</h3>
          <ul>{plan.features.map(f => <li key={f}>{f}</li>)}</ul>
          <button onClick={() => handlePlanSelect(plan)}>Choose</button>
        </div>
      ))}
    </div>
  );
}

export default SelectPlan;
