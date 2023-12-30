import { Navbar } from "./_components/sidebar";

const BrowseLayout = ({
    children,
} : {
    children: React.ReactNode
}) => {
    return(
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                {children}
            </div>
        </>
    )
}

export default BrowseLayout;