import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllContents } from "@/lib/api";
import { GlassCard } from "@/components/ui/glass-card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import {
    Activity as ActivityIcon,
    ExternalLink,
    Hash,
    User,
    Clock,
    Loader2,
    Database,
} from "lucide-react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import LiquidEther from "@/components/LiquidEther";

// Helper to format address
const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Helper to format time ago
const formatTimeAgo = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;

    if (diff < 60) return `${diff} secs ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} mins ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
};

// Helper to format date
const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function Activity() {
    const [currentPage, setCurrentPage] = useState(1);
    const [scrolled, setScrolled] = useState(false);
    const itemsPerPage = 10;

    // Fetch all contents with auto-refresh every 10 seconds
    const { data: allContents, isLoading, error } = useQuery({
        queryKey: ["allContents"],
        queryFn: getAllContents,
        refetchInterval: 10000, // Refresh every 10 seconds for real-time updates
    });

    // Sort by timestamp (newest first) and paginate
    const sortedContents = allContents
        ? [...allContents].sort((a, b) => b.timestamp - a.timestamp)
        : [];

    const totalPages = Math.ceil(sortedContents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentContents = sortedContents.slice(startIndex, endIndex);

    // Handle scroll for navbar effect
    useState(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    // Generate page numbers for pagination
    const getPageNumbers = () => {
        const pages: (number | "ellipsis")[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) pages.push(i);
                pages.push("ellipsis");
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push("ellipsis");
                for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1);
                pages.push("ellipsis");
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push("ellipsis");
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden font-sans selection:bg-blue-500/30 dark:selection:bg-blue-500/30">
            {/* LiquidEther Background */}
            <div
                className="fixed inset-0 pointer-events-none bg-background"
                style={{ zIndex: 0 }}
            >
                <LiquidEther
                    colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
                    mouseForce={20}
                    cursorSize={100}
                    isViscous={false}
                    viscous={30}
                    iterationsViscous={32}
                    iterationsPoisson={32}
                    resolution={0.5}
                    isBounce={false}
                    autoDemo={true}
                    autoSpeed={0.5}
                    autoIntensity={2.2}
                    takeoverDuration={0.25}
                    autoResumeDelay={3000}
                    autoRampDuration={0.6}
                />
            </div>

            {/* Overlay gradient for text readability */}
            <div
                className="fixed inset-0 pointer-events-none bg-gradient-to-b from-background/80 via-background/40 to-background/80 dark:from-black/80 dark:via-black/40 dark:to-black/80"
                style={{ zIndex: 1 }}
            />

            {/* Content wrapper */}
            <div className="relative z-10">
                {/* Navbar */}
                <LandingNavbar scrolled={scrolled} />

                {/* Main Content */}
                <main className="pt-32 pb-20 px-4 md:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <header className="mb-8 text-center">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                                    <ActivityIcon className="w-8 h-8 text-blue-400" />
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    Activity Feed
                                </h1>
                            </div>
                            <p className="text-muted-foreground text-lg">
                                Real-time blockchain transaction logs • Updates every 10 seconds
                            </p>
                            {allContents && (
                                <p className="text-sm text-muted-foreground mt-2">
                                    Total Transactions: <span className="text-blue-400 font-semibold">{allContents.length}</span>
                                </p>
                            )}
                        </header>

                        {/* Activity Table */}
                        <GlassCard className="p-0 overflow-hidden">
                            <div className="overflow-x-auto">
                                {isLoading ? (
                                    <div className="flex items-center justify-center py-20">
                                        <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
                                    </div>
                                ) : error ? (
                                    <div className="text-center py-20 text-red-400">
                                        <p>Failed to load activity feed</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {(error as Error).message}
                                        </p>
                                    </div>
                                ) : !currentContents || currentContents.length === 0 ? (
                                    <div className="text-center py-20 text-gray-500">
                                        <Database className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                        <p className="text-lg font-medium">No activity yet</p>
                                        <p className="text-sm mt-1">
                                            Transaction logs will appear here once content is registered
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="text-gray-500 border-b border-white/5 text-sm uppercase tracking-wider bg-white/[0.02]">
                                                    <th className="p-6 font-medium">Content</th>
                                                    <th className="p-6 font-medium">Publisher</th>
                                                    <th className="p-6 font-medium">pHash</th>
                                                    <th className="p-6 font-medium">TX Hash</th>
                                                    <th className="p-6 font-medium text-right">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {currentContents.map((item: any, index: number) => (
                                                    <tr
                                                        key={item.id || index}
                                                        className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                                    >
                                                        <td className="p-6">
                                                            <div className="flex items-start gap-3 max-w-md">
                                                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30 flex-shrink-0">
                                                                    <ActivityIcon className="w-5 h-5 text-blue-400" />
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <p className="font-medium text-white truncate">
                                                                        {item.title || "Untitled"}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 line-clamp-2">
                                                                        {item.description
                                                                            ? item.description.substring(0, 60) + "..."
                                                                            : "No description"}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-6">
                                                            <div className="flex items-center gap-2">
                                                                <User className="w-4 h-4 text-purple-400" />
                                                                <span className="font-mono text-xs text-purple-300">
                                                                    {formatAddress(item.publisher)}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="p-6">
                                                            <div className="flex items-center gap-2">
                                                                <Hash className="w-4 h-4 text-blue-400" />
                                                                <div className="font-mono text-xs text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded">
                                                                    {item.phash
                                                                        ? `${item.phash.substring(0, 12)}...`
                                                                        : "N/A"}
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="p-6">
                                                            <a
                                                                href={`https://sepolia-blockscout.lisk.com/tx/${item.txhash}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors cursor-pointer group/tx font-mono"
                                                            >
                                                                <span>{formatAddress(item.txhash)}</span>
                                                                <ExternalLink className="w-3 h-3 opacity-0 group-hover/tx:opacity-100 transition-opacity" />
                                                            </a>
                                                        </td>
                                                        <td className="p-6 text-right">
                                                            <div className="flex flex-col items-end gap-1">
                                                                <div className="flex items-center gap-2 text-gray-500">
                                                                    <Clock className="w-3 h-3" />
                                                                    <span className="text-xs">
                                                                        {formatTimeAgo(item.timestamp)}
                                                                    </span>
                                                                </div>
                                                                <span className="text-xs text-gray-600">
                                                                    {formatDate(item.timestamp)}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {/* Pagination */}
                                        {totalPages > 1 && (
                                            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                                                <Pagination>
                                                    <PaginationContent>
                                                        <PaginationItem>
                                                            <PaginationPrevious
                                                                onClick={() =>
                                                                    setCurrentPage((p) => Math.max(1, p - 1))
                                                                }
                                                                className={
                                                                    currentPage === 1
                                                                        ? "pointer-events-none opacity-50"
                                                                        : "cursor-pointer"
                                                                }
                                                            />
                                                        </PaginationItem>

                                                        {getPageNumbers().map((page, idx) => (
                                                            <PaginationItem key={idx}>
                                                                {page === "ellipsis" ? (
                                                                    <PaginationEllipsis />
                                                                ) : (
                                                                    <PaginationLink
                                                                        onClick={() => setCurrentPage(page as number)}
                                                                        isActive={currentPage === page}
                                                                        className="cursor-pointer"
                                                                    >
                                                                        {page}
                                                                    </PaginationLink>
                                                                )}
                                                            </PaginationItem>
                                                        ))}

                                                        <PaginationItem>
                                                            <PaginationNext
                                                                onClick={() =>
                                                                    setCurrentPage((p) =>
                                                                        Math.min(totalPages, p + 1)
                                                                    )
                                                                }
                                                                className={
                                                                    currentPage === totalPages
                                                                        ? "pointer-events-none opacity-50"
                                                                        : "cursor-pointer"
                                                                }
                                                            />
                                                        </PaginationItem>
                                                    </PaginationContent>
                                                </Pagination>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </GlassCard>
                    </div>
                </main>

                {/* Footer */}
                <LandingFooter />
            </div>
        </div>
    );
}
