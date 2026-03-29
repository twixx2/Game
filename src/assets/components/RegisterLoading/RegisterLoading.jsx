
const RegisterLoading = ({ loading, fail, success }) => {

    return (
        <div className="register_loading">
            {
                loading ?
                    <h2 className="register_loading_title">please wait...</h2>
                    :
                    fail ?
                        <h2 className="register_loading_title">registration failed</h2>
                        : success &&
                        <h2 className="register_loading_title">done!</h2>}
        </div>
    );


};

export default RegisterLoading;