import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
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
import { FileText, MoreVertical, ExternalLink, Clock, Hash, Loader2, Database } from "lucide-react";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { getMyContents } from "@/lib/api";

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

export default function MyContents() {
  const { address, isConnected } = useAccount();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch user's contents
  const { data: contents, isLoading, error } = useQuery({
    queryKey: ["myContents", address],
    queryFn: () => getMyContents(address as string),
    enabled: !!address && isConnected,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Pagination logic
  const totalPages = Math.ceil((contents?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContents = contents?.slice(startIndex, endIndex) || [];

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
    <Layout>
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white">My Contents</h2>
          <p className="text-gray-400 mt-1">Manage your registered digital assets and view their blockchain proofs.</p>
          {contents && contents.length > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Total: <span className="text-blue-400 font-semibold">{contents.length}</span> items
            </p>
          )}
        </div>
      </header>

      <GlassCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-blue-400" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-400">
              <p>Failed to load your contents</p>
              <p className="text-sm text-gray-500 mt-1">{(error as Error).message}</p>
            </div>
          ) : !contents || contents.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <Database className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg font-medium">No content registered yet</p>
              <p className="text-sm mt-1">Upload your first content to get started</p>
              <a
                href="/dashboard/upload"
                className="inline-block mt-4 px-6 py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
              >
                Register Content
              </a>
            </div>
          ) : (
            <>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-500 border-b border-white/5 text-sm uppercase tracking-wider bg-white/[0.02]">
                    <th className="p-6 font-medium">Asset Details</th>
                    <th className="p-6 font-medium">pHash</th>
                    <th className="p-6 font-medium">TX Hash</th>
                    <th className="p-6 font-medium text-right">Registered</th>
                    <th className="p-6 font-medium w-10"></th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {currentContents.map((item: any) => (
                    <tr key={item.id} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30">
                            <FileText className="w-5 h-5 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{item.title || "Untitled"}</p>
                            <p className="text-xs text-gray-500">
                              {item.description ? item.description.substring(0, 50) + "..." : "No description"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-blue-400" />
                          <div className="font-mono text-xs text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded w-fit">
                            {item.phash ? `${item.phash.substring(0, 12)}...` : "N/A"}
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
                        <div className="flex items-center justify-end gap-2 text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatTimeAgo(item.timestamp)}
                        </div>
                      </td>
                      <td className="p-6">
                        <button className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
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
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
                            setCurrentPage((p) => Math.min(totalPages, p + 1))
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
    </Layout>
  );
}
