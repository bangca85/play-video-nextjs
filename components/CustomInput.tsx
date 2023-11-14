interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    webkitdirectory?: string;
    directory?: string;
}

export const CustomInput: React.FC<CustomInputProps> = (props) => {
    return <input {...props} />;
};
