import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './cases.scss';
export default function CasesPage() {
  const url = import.meta.env.VITE_USER_API_URL;
  const [cases, setCases] = useState([]);
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${url}/auth_me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBalance(res.data.balance);
      } catch (err) {
        void err;
        navigate("/register")
      }
    }
    fetchUser();
    axios.get(`${url}/cases`, { headers }).then(r => setCases(r.data));
  }, []);
  const navigate = useNavigate();

  return (
    <div className="cases_page">

      <nav className="nav">
        <div className="nav_content container">
          <div className="nav_back" onClick={() => navigate("/")}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <a href="#" className="nav_content_logo">All Cases</a>

          <div className="balance_info">
            <div className="balance_user">
              <span className="balance_user_coins">
                {balance} w$
              </span>
            </div>
          </div>

        </div>
      </nav>

      <div className="cases_grid">
        {cases.map(c => (
          <div key={c.id} onClick={() => navigate(`/cases/${c.id}`)} className="case_card">
            <div className="case_card_bg"></div>
            <div className="case_card_content">

              <h2 className="case_card_content_name">
                {c.title}
              </h2>

              <div className="case_card_content_image">
                <img src={c.image} alt={c.title} />
              </div>

              <div className="case_card_content_price">
                <span>
                  w$
                </span>
                <span>
                  {c.price}
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="test_case">
        <span className="test_case_alert">
          this is a test version. if anythings wrong, hit up enbanana
        </span>
      </div>

    </div>
  );
}
