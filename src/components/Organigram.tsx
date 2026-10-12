"use client";

import { useState } from "react";
import type { OrgNode } from "@/lib/aja";

function NodeCard({
  node,
  editable,
  onEdit,
  depth = 0,
}: {
  node: OrgNode;
  editable?: boolean;
  onEdit?: (id: string, name: string) => void;
  depth?: number;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(node.name);

  return (
    <div className={depth === 0 ? "" : "mt-3"}>
      <div
        className={`rounded-xl border px-4 py-3 ${
          node.confirmed
            ? "border-gold/30 bg-navy-2/80"
            : "border-dashed border-gold/20 bg-navy/50"
        }`}
      >
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-gold">
          {node.role}
        </p>
        {editing && editable ? (
          <div className="mt-2 flex gap-2">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 rounded-lg border border-gold/25 bg-navy px-3 py-1.5 text-sm outline-none"
            />
            <button
              type="button"
              className="rounded-lg bg-gold px-3 text-xs font-semibold text-navy"
              onClick={() => {
                onEdit?.(node.id, value);
                setEditing(false);
              }}
            >
              OK
            </button>
          </div>
        ) : (
          <div className="mt-1 flex items-start justify-between gap-2">
            <p className="font-semibold tracking-tight">{node.name}</p>
            {editable && (
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="shrink-0 text-[0.65rem] font-semibold text-gold-bright"
              >
                Editar
              </button>
            )}
          </div>
        )}
        {node.note && <p className="mt-1 text-xs text-cream/40">{node.note}</p>}
        {!node.confirmed && (
          <p className="mt-1 text-[0.6rem] font-semibold uppercase tracking-wide text-cream/30">
            Editável · a confirmar
          </p>
        )}
      </div>
      {node.children && node.children.length > 0 && (
        <div
          className={`mt-3 grid gap-3 ${
            node.children.length > 4
              ? "sm:grid-cols-2 lg:grid-cols-3"
              : node.children.length > 1
                ? "sm:grid-cols-2"
                : ""
          } ${depth > 0 ? "border-l border-gold/15 pl-4" : ""}`}
        >
          {node.children.map((child) => (
            <NodeCard
              key={child.id}
              node={child}
              editable={editable}
              onEdit={onEdit}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function updateName(node: OrgNode, id: string, name: string): OrgNode {
  if (node.id === id) return { ...node, name, confirmed: true };
  if (!node.children) return node;
  return {
    ...node,
    children: node.children.map((c) => updateName(c, id, name)),
  };
}

export function OrganigramView({
  root,
  editable,
  onChange,
}: {
  root: OrgNode;
  editable?: boolean;
  onChange?: (next: OrgNode) => void;
}) {
  return (
    <NodeCard
      node={root}
      editable={editable}
      onEdit={(id, name) => onChange?.(updateName(root, id, name))}
    />
  );
}
