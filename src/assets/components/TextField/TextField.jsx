
const TextField = ({ placeholder, type, className, value, onChange }) => {

    return <input
        type={type}
        placeholder={placeholder}
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
    />;
}

export default TextField;