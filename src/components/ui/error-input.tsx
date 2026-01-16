interface ErrorInputProps {
    description?: string
    children?: React.ReactNode
    className?: string
}

export function ErrorInput({ description, children, className }: ErrorInputProps) {
    return (
        <div className={className}>
            <span className="text-red text-xs">
                {children || description}
            </span>
        </div>
    );
}