interface RegisterLoadingProps {
    loading: boolean;
    fail: boolean;
    success: boolean;
}

export const RegisterLoading = ({ loading, fail, success }: RegisterLoadingProps) => {
    const render = () => {
        if (loading) {
            return (<h2 className="register_loading_title">please wait...</h2>)
        }
        if (fail) {
            return (<h2 className="register_loading_title">registration failed</h2>)
        }
        if (success) {
            return (<h2 className="register_loading_title">done!</h2>)
        }
    }

    return (
        <div className="register_loading">
            {render()}
        </div>
    );


};