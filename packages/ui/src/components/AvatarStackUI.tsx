"use client";

import Image from "next/image";

export interface SyncCartUser {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface AvatarStackUIProps {
  users: SyncCartUser[];
  maxDisplay?: number;
  size?: number;
  className?: string;
}

const AVATAR_BACKGROUND_PALETTE = [
  "bg-orange-500",
  "bg-emerald-500",
  "bg-blue-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-fuchsia-500",
];

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";

  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function getColorForUser(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_BACKGROUND_PALETTE.length;
  return AVATAR_BACKGROUND_PALETTE[index];
}

export default function AvatarStackUI({
  users,
  maxDisplay = 4,
  size = 36,
  className = "",
}: AvatarStackUIProps) {
  if (!users || users.length === 0) {
    return null;
  }

  const visibleUsers = users.slice(0, maxDisplay);
  const overflowCount = users.length - visibleUsers.length;

  return (
    <div
      className={`flex items-center ${className}`}
      role="group"
      aria-label={`${users.length} ${users.length === 1 ? "person" : "people"} collaborating on this cart`}
    >
      {visibleUsers.map((user, index) => {
        const hasImage = Boolean(user.imageUrl);
        const initials = getInitials(user.name);
        const colorClass = getColorForUser(user.id);

        return (
          <div
            key={user.id}
            className="relative shrink-0 rounded-full ring-[3px] ring-white transition-transform duration-200 ease-out hover:z-10 hover:scale-110 dark:ring-neutral-900"
            style={{
              width: size,
              height: size,
              marginLeft: index === 0 ? 0 : -Math.round(size * 0.3),
              zIndex: visibleUsers.length - index,
            }}
            title={user.name}
          >
            {hasImage ? (
              <Image
                src={user.imageUrl as string}
                alt={user.name}
                fill
                sizes={`${size}px`}
                className="rounded-full object-cover"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center rounded-full ${colorClass} text-white`}
                style={{ fontSize: Math.max(10, Math.round(size * 0.36)) }}
              >
                <span className="font-semibold leading-none">{initials}</span>
              </div>
            )}
          </div>
        );
      })}

      {overflowCount > 0 && (
        <div
          className="relative flex shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 ring-[3px] ring-white dark:bg-neutral-700 dark:text-neutral-200 dark:ring-neutral-900"
          style={{
            width: size,
            height: size,
            marginLeft: -Math.round(size * 0.3),
            zIndex: 0,
            fontSize: Math.max(10, Math.round(size * 0.32)),
          }}
          title={`${overflowCount} more ${overflowCount === 1 ? "person" : "people"}`}
        >
          <span className="font-semibold leading-none">+{overflowCount}</span>
        </div>
      )}
    </div>
  );
}