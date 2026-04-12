/* eslint-disable react-hooks/exhaustive-deps */
import './cases.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useAuth } from '../../context/AuthContext';

export default function CasesPage() {
  const url = import.meta.env.VITE_USER_API_URL;
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { balance, headers } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    setLoading(true);
    axios
      .get(`${url}/cases?_select=-items`, { headers })
      .then(r => {
        setCases(r.data);
      })
      .catch(err => {
        if (err.response) {
          setError(err.response.status + " " + err.response.data.error);
        } else {
          setError(err.message);
        }
      })
      .finally(() => { timer = setTimeout(() => setLoading(false), 500); });
    return () => clearTimeout(timer);
  }, []);


  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="cases_page">

      <h2 className="balance">
        {new Intl.NumberFormat("ru").format(balance)} w$
      </h2>

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

    </div>
  );
}
