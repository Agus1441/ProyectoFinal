const Header = ({title, buttons}) => {
    return(
        <div>
            <h3>{title}</h3>
            {buttons.map((button) => {
                <img src={button.image} alt={button.altText} onClick={button.action} />
            })}
        </div>
    )
}

export default Header;