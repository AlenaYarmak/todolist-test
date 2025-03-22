import moonIcon from '../assets/icon-moon.svg';

const Header = () => {
    return (
        <div className='header'>
            <h2 className='header__title'>TODO</h2>
                <img
                    className='toggle-icon'
                    src={moonIcon}
                    alt='theme toggle'>
            </img>
        </div>
    )
}

export default Header;