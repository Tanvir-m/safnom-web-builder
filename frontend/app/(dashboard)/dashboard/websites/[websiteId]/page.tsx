"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { WebsiteStatusBadge } from "@/components/dashboard/WebsiteStatusBadge";
import { WorkspaceRequired } from "@/components/dashboard/WorkspaceRequired";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { FieldLabel, Input } from "@/components/ui/Input";
import { useWorkspace } from "@/contexts/WorkspaceContext";
import { ApiClientError } from "@/lib/api-client";
import { confirmAction } from "@/lib/confirm";
import { notify, notifyApiError } from "@/lib/notify";
import * as websitesApi from "@/services/websites.api";
import type { Website, WebsiteStatus } from "@/types/website";

const STATUSES: WebsiteStatus[] = ["DRAFT", "PUBLISHED", "UNPUBLISHED"];

export default function WebsiteDetailPage() {
  const params = useParams();
  const websiteId = params.websiteId as string;
  const router = useRouter();
  const { currentWorkspace } = useWorkspace();
  const [website, setWebsite] = useState<Website | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<WebsiteStatus>("DRAFT");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!currentWorkspace) return;
    setLoading(true);
    setError(null);
    try {
      const res = await websitesApi.getWebsite(currentWorkspace.id, websiteId);
      setWebsite(res.data);
      setName(res.data.name);
      setDescription(res.data.description ?? "");
      setStatus(res.data.status);
    } catch (err) {
      setError(
        err instanceof ApiClientError ? err.message : "Failed to load website"
      );
    } finally {
      setLoading(false);
    }
  }, [currentWorkspace, websiteId]);

  useEffect(() => {
    void load();
  }, [load]);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    if (!currentWorkspace) return;
    setSaving(true);
    setError(null);
    try {
      const res = await websitesApi.updateWebsite(
        currentWorkspace.id,
        websiteId,
        {
          name: name.trim(),
          description: description.trim() || null,
          status,
        }
      );
      setWebsite(res.data);
      notify.success("Website settings saved.");
    } catch (err) {
      notifyApiError(err, "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!currentWorkspace || !website) return;
    if (
      !(await confirmAction({
        title: "Delete website?",
        message: `Delete "${website.name}"? This cannot be undone.`,
        confirmLabel: "Delete",
        tone: "danger",
      }))
    ) {
      return;
    }
    try {
      await websitesApi.deleteWebsite(currentWorkspace.id, websiteId);
      router.push("/dashboard/websites");
    } catch (err) {
      notifyApiError(err, "Delete failed");
    }
  }

  return (
    <WorkspaceRequired>
      <div className="max-w-lg">
        <Link
          href="/dashboard/websites"
          className="mb-4 inline-block text-sm text-muted hover:text-brand"
        >
          ← Websites
        </Link>

        {loading ? (
          <div className="dashboard-panel p-8 text-sm text-muted">Loading…</div>
        ) : !website ? (
          <Alert tone="error">{error ?? "Website not found"}</Alert>
        ) : (
          <>
            <DashboardPageHeader
              title={website.name}
              description={`Slug: ${website.slug}`}
              actions={<WebsiteStatusBadge status={website.status} />}
            />

            <div className="dashboard-panel mb-6 space-y-3 p-5">
              <dl className="space-y-2 text-sm">
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-muted">Website ID:</dt>
                  <dd className="font-mono text-xs font-semibold tracking-wide">
                    {website.publicId}
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-muted">Subscription:</dt>
                  <dd className="font-mono text-xs font-semibold tracking-wide">
                    {website.subscriptionId}
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-2">
                  <dt className="text-muted">Status:</dt>
                  <dd>
                    {website.status === "PUBLISHED"
                      ? "Active"
                      : website.status === "UNPUBLISHED"
                        ? "Paused"
                        : "Draft"}
                  </dd>
                </div>
              </dl>
              <p className="text-[11px] text-muted">
                These IDs never change when you edit the site. Internal database
                IDs are not shown.
              </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              <Link
                href={`/dashboard/websites/${websiteId}/editor`}
                className="btn-primary rounded-lg px-3 py-2 text-xs"
              >
                Edit Website
              </Link>
              <Link
                href={`/dashboard/websites/${websiteId}/preview`}
                className="btn-secondary rounded-lg px-3 py-2 text-xs"
              >
                Preview
              </Link>
              <Link
                href={`/dashboard/websites/${websiteId}/pages`}
                className="btn-secondary rounded-lg px-3 py-2 text-xs"
              >
                Pages
              </Link>
            </div>

            <form
              onSubmit={(e) => void onSave(e)}
              className="dashboard-panel space-y-4 p-6"
            >
              {error ? <Alert tone="error">{error}</Alert> : null}
              <div>
                <FieldLabel htmlFor="website-name">Name</FieldLabel>
                <Input
                  id="website-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Description
                </label>
                <textarea
                  className="w-full rounded-xl border border-card-border bg-background px-3 py-2 text-sm"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Status</label>
                <select
                  className="w-full rounded-xl border border-card-border bg-background px-3 py-2 text-sm"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as WebsiteStatus)}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-muted">
                  For your records only — public publishing and custom domains are not live yet. Use Preview to review saved content.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save changes"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="text-red-600 dark:text-red-400"
                  onClick={() => void onDelete()}
                >
                  Delete website
                </Button>
              </div>
            </form>
          </>
        )}
      </div>
    </WorkspaceRequired>
  );
}
