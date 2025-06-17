import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  ExternalLink,
  GitCommit,
  Clock,
  User,
  Hash,
} from "lucide-react";

const GitHubCommitTracker = ({
  repositories = [
    {
      name: "Dgit",
      url: "https://github.com/Shubham-Singh-Shoora/Dgit---Decentralised-Github.git",
    },
    {
      name: "Dgit Update Tracker",
      url: "https://github.com/Nakulsaini07-coder/TeamH_Update_Tracker.git",
    },
  ],
}) => {
  const [activeRepo, setActiveRepo] = useState(null);
  const [commits, setCommits] = useState({});
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});
  const [expandedCommits, setExpandedCommits] = useState({});

  const parseGitHubUrl = (url) => {
    const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (match) {
      return { owner: match[1], repo: match[2].replace(".git", "") };
    }
    return null;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 7) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } else if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const truncateMessage = (message, maxLength = 80) => {
    const firstLine = message.split("\n")[0];
    if (firstLine.length <= maxLength) return firstLine;
    return firstLine.substring(0, maxLength) + "...";
  };

  const fetchCommits = async (repoKey, url) => {
    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      setErrors((prev) => ({ ...prev, [repoKey]: "Invalid GitHub URL" }));
      return;
    }

    setLoading((prev) => ({ ...prev, [repoKey]: true }));
    setErrors((prev) => ({ ...prev, [repoKey]: "" }));

    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN;
      const headers = {
        Accept: "application/vnd.github.v3+json",
      };
      if (token) {
        headers["Authorization"] = `token ${token}`;
      }

      const branchesRes = await fetch(
        `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/branches`,
        { headers }
      );
      if (!branchesRes.ok) throw new Error("Failed to fetch branches");
      const branches = await branchesRes.json();

      let allCommits = [];
      for (const branch of branches) {
        let page = 1;
        let hasMore = true;
        while (hasMore) {
          const commitsRes = await fetch(
            `https://api.github.com/repos/${parsed.owner}/${parsed.repo}/commits?sha=${branch.name}&per_page=100&page=${page}`,
            { headers }
          );
          if (!commitsRes.ok) throw new Error("Failed to fetch commits");
          const commitsData = await commitsRes.json();
          allCommits = allCommits.concat(commitsData);
          if (commitsData.length < 100) {
            hasMore = false;
          } else {
            page += 1;
          }
        }
      }

      const uniqueCommits = [];
      const seen = new Set();
      for (const commit of allCommits) {
        if (!seen.has(commit.sha)) {
          seen.add(commit.sha);
          uniqueCommits.push(commit);
        }
      }

      setCommits((prev) => ({ ...prev, [repoKey]: uniqueCommits }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [repoKey]:
          error instanceof Error ? error.message : "Failed to fetch commits",
      }));
    } finally {
      setLoading((prev) => ({ ...prev, [repoKey]: false }));
    }
  };

  const handleRepoClick = (repoKey, url) => {
    if (activeRepo === repoKey) {
      setActiveRepo(null);
    } else {
      setActiveRepo(repoKey);
      if (!commits[repoKey] && !loading[repoKey]) {
        fetchCommits(repoKey, url);
      }
    }
  };

  const toggleCommitExpansion = (commitSha) => {
    setExpandedCommits((prev) => ({
      ...prev,
      [commitSha]: !prev[commitSha],
    }));
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4 mt-6">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="dark-card rounded-lg p-4 animate-pulse"
        >
          <div className="flex items-start space-x-3">
            <div className="w-5 h-5 bg-slate-600 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-600 rounded w-3/4"></div>
              <div className="flex space-x-4">
                <div className="h-3 bg-slate-600 rounded w-20"></div>
                <div className="h-3 bg-slate-600 rounded w-24"></div>
                <div className="h-3 bg-slate-600 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id="github-commits" className="section-spacing bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 right-32 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GitCommit className="w-8 h-8 text-green-400" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text">
              GitHub Repository
            </h2>
          </div>
          <p className="text-lg sm:text-xl text-secondary-enhanced max-w-2xl mx-auto leading-relaxed">
            Explore our latest commits and development activity
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="dark-card rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
            {/* Repository List */}
            <div className="divide-y divide-white/10">
              {repositories.map((repo, index) => {
                const repoKey = `${repo.name}-${index}`;
                const isActive = activeRepo === repoKey;
                const isLoading = loading[repoKey];
                const error = errors[repoKey];
                const repoCommits = commits[repoKey] || [];

                return (
                  <div key={repoKey} className="transition-all duration-200">
                    {/* Repository Header */}
                    <button
                      onClick={() => handleRepoClick(repoKey, repo.url)}
                      className="w-full px-6 py-6 flex items-center justify-between hover:bg-white/5 transition-colors duration-200 focus:outline-none focus:bg-white/5 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          {isActive ? (
                            <ChevronDown className="w-5 h-5 text-blue-400 transition-transform duration-200" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-blue-400 transition-transform duration-200" />
                          )}
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
                            <h3 className="text-lg font-semibold text-enhanced group-hover:text-blue-400 transition-colors">
                              {repo.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <ExternalLink
                        className="w-4 h-4 text-muted-enhanced hover:text-blue-400 transition-colors opacity-0 group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(repo.url, "_blank");
                        }}
                      />
                    </button>

                    {/* Commits Section */}
                    {isActive && (
                      <div className="bg-slate-800/50 border-t border-white/10">
                        {isLoading && <LoadingSkeleton />}

                        {error && (
                          <div className="p-6">
                            <div className="glass-effect border border-red-500/20 rounded-lg p-4">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <p className="text-red-400 font-medium">
                                  Error loading commits
                                </p>
                              </div>
                              <p className="text-red-300 text-sm mt-1">{error}</p>
                            </div>
                          </div>
                        )}

                        {!isLoading && !error && repoCommits.length > 0 && (
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-secondary-enhanced uppercase tracking-wide">
                                Recent Commits
                              </h4>
                              <span className="text-xs text-muted-enhanced glass-effect px-3 py-1 rounded-full">
                                {repoCommits.length} commits
                              </span>
                            </div>
                            <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                              {repoCommits.slice(0, 10).map((commit, commitIndex) => {
                                const isExpanded = expandedCommits[commit.sha];
                                const fullMessage = commit.commit.message;
                                const truncatedMessage = truncateMessage(fullMessage);
                                const hasLongMessage =
                                  fullMessage.length > truncatedMessage.length;

                                return (
                                  <div
                                    key={commit.sha}
                                    className="glass-effect rounded-lg border border-white/10 p-4 hover:bg-white/5 transition-all duration-200 hover:border-blue-400/30 hover-lift"
                                  >
                                    <div className="flex items-start space-x-3">
                                      <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                                      <div className="flex-1 min-w-0">
                                        {/* Commit Message */}
                                        <div className="mb-3">
                                          <p
                                            className={`text-enhanced font-medium leading-relaxed ${
                                              hasLongMessage
                                                ? "cursor-pointer hover:text-blue-400"
                                                : ""
                                            }`}
                                            onClick={() =>
                                              hasLongMessage &&
                                              toggleCommitExpansion(commit.sha)
                                            }
                                          >
                                            {isExpanded
                                              ? fullMessage
                                              : truncatedMessage}
                                            {hasLongMessage && (
                                              <span className="text-blue-400 hover:text-blue-300 ml-1 text-sm font-normal">
                                                {isExpanded
                                                  ? " (show less)"
                                                  : " (show more)"}
                                              </span>
                                            )}
                                          </p>
                                        </div>

                                        {/* Commit Details */}
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-secondary-enhanced">
                                          <div className="flex items-center space-x-1">
                                            <User className="w-3 h-3" />
                                            <span className="font-medium">
                                              {commit.commit.author.name}
                                            </span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <Clock className="w-3 h-3" />
                                            <span>
                                              {formatDate(commit.commit.author.date)}
                                            </span>
                                          </div>
                                          <div className="flex items-center space-x-1">
                                            <Hash className="w-3 h-3" />
                                            <code className="text-xs bg-slate-700 px-2 py-1 rounded font-mono text-blue-300">
                                              {commit.sha.substring(0, 7)}
                                            </code>
                                          </div>
                                          <a
                                            href={commit.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                                          >
                                            <ExternalLink className="w-3 h-3" />
                                            <span>View on GitHub</span>
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {!isLoading && !error && repoCommits.length === 0 && (
                          <div className="p-12">
                            <div className="text-center text-muted-enhanced">
                              <GitCommit className="w-12 h-12 mx-auto mb-3 opacity-50" />
                              <p className="text-lg font-medium">
                                No commits found
                              </p>
                              <p className="text-sm mt-1">
                                This repository might be empty or private
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {repositories.length === 0 && (
              <div className="p-12 text-center text-muted-enhanced">
                <GitCommit className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-xl font-medium">No repositories configured</p>
                <p className="text-sm mt-2">
                  Add repositories to track their commits
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubCommitTracker;