import './RegisterConfirm.scss';


const RegisterConfirm = ({ onNext, onBack, login, password }) => {

    return (
        <>
            <div className='register_confirm'>
                <span className='register_step'>Step 3 / 3</span>

                <div className="register_confirm_content">
                    <h2 className='register_confirm_title'>
                        Almost there
                    </h2>
                    <h3 className='register_confirm_subtitle'>
                        is everything right?
                    </h3>
                    <ul className='register_confirm_list'>
                        <li>
                            name: <span>{login}</span>
                        </li>
                        <li>
                            password: <span>{password}</span>
                        </li>

                    </ul>


                    <button onClick={onNext} className='register_confirm_btn'>
                        create
                    </button>
                    <button onClick={onBack} className='register_confirm_btn_back'>
                        i am not done
                    </button>
                </div>


            </div>
        </>
    );



};

export default RegisterConfirm;