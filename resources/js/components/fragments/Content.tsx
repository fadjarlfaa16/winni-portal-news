interface ContentProps {
    children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
    return (
        <div className="mx-auto w-full justify-center bg-white text-center lg:w-[80%]">
            <div className="navbar">{children}</div>
        </div>
    );
}
