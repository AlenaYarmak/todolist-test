import closeIcon from '../assets/icon-cross.svg'

interface RemoveButtonProps {
    onClick: () => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick }) => {
    return (
        <div 
            className='remove-button'
            onClick={onClick}>
            <img src={closeIcon} alt='close task button' />
        </div>
    )
}

export default RemoveButton;