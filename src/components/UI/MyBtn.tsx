import style from './MyButton.module.css'


const MyBtn = ({ ...props }) => {
    return <button className={style.My_Button} {...props}></button>;
};

export default MyBtn;
