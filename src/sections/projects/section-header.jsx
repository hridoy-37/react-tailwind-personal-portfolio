export default function SectionHeader() {
    return (
        <div className="text-center mx-auto max-w-3xl mb-16">
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
                Featured Work
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
                Projects that
                <span className="font-serif italic font-normal text-white">
                    {" "}
                    make an impact.
                </span>
            </h2>
            <p className="text-muted-foreground animate-fade-in animation-delay-200">
                A selection of my recent work, from complex web applications to
                innovative tools that solve real-world problems.
            </p>
        </div>
    )
}