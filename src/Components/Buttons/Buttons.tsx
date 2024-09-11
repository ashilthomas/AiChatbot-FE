

type buttonTp = {
    children: JSX.Element | string,
    className?: string
    onClick?: (params:any) => void;
}

function Buttons({ children, className, onClick }: buttonTp) {
    return (
        <button className={className} onClick={onClick}>
            {children}


        </button>
    )
}

export default Buttons