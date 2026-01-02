interface ErrorInputProps {
    description: string
}

export function ErrorInput({ description }: ErrorInputProps) {
    return (
        <>
            <span className="text-red text-xs">{description}</span>
        </>
    );
}