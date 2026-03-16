"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Search,
  MoreHorizontal,
  Check,
  X,
  Sparkles,
  Trash2,
  Plus,
} from "lucide-react";

type Opportunity = {
  id: number;
  title: string;
  url: string;
  source_name: string;
  status: string;
};

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<number[]>([]);
  const [urlInput, setUrlInput] = useState("");

  const fetchOpportunities = async () => {
    try {
      const res = await fetch("/api/opportunities");

      if (!res.ok) throw new Error("Failed to fetch opportunities");

      const data = await res.json();

      setOpportunities(data);
    } catch (err) {
      console.error("Failed to fetch opportunities", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const filtered = opportunities.filter((o) =>
    o.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStatus = async (id: number, status: string) => {
    await fetch(`/api/opportunities/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });

    setOpportunities((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  const generatePost = async (id: number) => {
    await fetch(`/api/opportunities/${id}/generate`, {
      method: "POST",
    });

    alert("Post generated");
  };

  const deleteOpportunity = async (id: number) => {
    if (!confirm("Delete this opportunity?")) return;

    await fetch(`/api/opportunities/${id}`, {
      method: "DELETE",
    });

    setOpportunities((prev) => prev.filter((o) => o.id !== id));
  };

  const deleteSelected = async () => {
    if (!confirm("Delete selected opportunities?")) return;

    await fetch("/api/opportunities/bulk-delete", {
      method: "POST",
      body: JSON.stringify({ ids: selected }),
    });

    setOpportunities((prev) => prev.filter((o) => !selected.includes(o.id)));
    setSelected([]);
  };

  const deleteAll = async () => {
    if (!confirm("Delete ALL opportunities?")) return;

    await fetch("/api/opportunities/delete-all", {
      method: "DELETE",
    });

    setOpportunities([]);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelected(checked ? filtered.map((o) => o.id) : []);
  };

  const handleSelect = (id: number, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const importFromUrl = async () => {
    if (!urlInput) return;

    const res = await fetch("/api/opportunities/from-url", {
      method: "POST",
      body: JSON.stringify({ url: urlInput }),
    });

    if (res.ok) {
      setUrlInput("");
      fetchOpportunities();
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "approved") return "bg-green-100 text-green-800";
    if (status === "rejected") return "bg-red-100 text-red-800";
    if (status === "generated") return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Opportunity Discovery
          </h1>

          <p className="text-gray-600">
            Import and manage discovered opportunities
          </p>
        </div>

        {/* URL Scraper */}

        <Card className="mb-6">
          <CardContent className="p-6 flex gap-2">
            <Input
              placeholder="Paste opportunity URL..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />

            <Button onClick={importFromUrl}>
              <Plus className="h-4 w-4 mr-2" />
              Generate Raw Opportunity
            </Button>
          </CardContent>
        </Card>

        {/* Search */}

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

              <Input
                placeholder="Search opportunities..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}

        {selected.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4 flex justify-between items-center">
              <span>{selected.length} selected</span>

              <Button
                variant="destructive"
                size="sm"
                onClick={deleteSelected}
              >
                Delete Selected
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Table */}

        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Discovered Opportunities</CardTitle>

            <Button
              variant="destructive"
              size="sm"
              onClick={deleteAll}
            >
              Delete All
            </Button>
          </CardHeader>

          <CardContent className="p-0">

            <Table>

              <TableHeader>
                <TableRow>

                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={
                        selected.length === filtered.length &&
                        filtered.length > 0
                      }
                      onChange={(e) =>
                        handleSelectAll(e.target.checked)
                      }
                    />
                  </TableHead>

                  <TableHead>Title</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead></TableHead>

                </TableRow>
              </TableHeader>

              <TableBody>

                {loading && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      Loading opportunities...
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  filtered.map((o) => (

                    <TableRow key={o.id}>

                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selected.includes(o.id)}
                          onChange={(e) =>
                            handleSelect(o.id, e.target.checked)
                          }
                        />
                      </TableCell>

                      <TableCell className="font-medium">
                        {o.title}
                      </TableCell>

                      <TableCell>
                        {o.source_name}
                      </TableCell>

                      <TableCell>
                        <Badge className={getStatusColor(o.status)}>
                          {o.status}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <a
                          href={o.url}
                          target="_blank"
                          className="text-blue-600"
                        >
                          View
                        </a>
                      </TableCell>

                      <TableCell>

                        <DropdownMenu>

                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">

                            <DropdownMenuItem
                              onClick={() =>
                                updateStatus(o.id, "approved")
                              }
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                updateStatus(o.id, "rejected")
                              }
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => generatePost(o.id)}
                            >
                              <Sparkles className="h-4 w-4 mr-2" />
                              Generate Post
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => deleteOpportunity(o.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>

                          </DropdownMenuContent>

                        </DropdownMenu>

                      </TableCell>

                    </TableRow>

                  ))}

              </TableBody>

            </Table>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}