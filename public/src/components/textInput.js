const TextInput = ({name, type='text', value, onEntry, extraClasses}) => {
  return (
      <input type={type}
             name={name}
             value={value}
             onChange={onEntry}
             placeholder={name}
             className={"rounded pl-2 "+extraClasses} />
  );
};

export default TextInput;
