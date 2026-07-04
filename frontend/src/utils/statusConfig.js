import {
  FaHourglassHalf,
  FaUserCheck,
  FaThumbsUp,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

// Single source of truth for every status a complaint can be in.
// The backend only ever sets one of these five values
// (see models/Complaint.js + models/AssignedComplaint.js), so every
// screen that renders a status badge should read from this map instead
// of re-implementing its own (mismatched) list of strings.
export const STATUS_CONFIG = {
  Pending: {
    label: "Pending",
    description: "Waiting to be assigned to an agent.",
    icon: FaHourglassHalf,
    badge: "bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-300",
    solid: "bg-amber-500",
    dot: "bg-amber-500",
    stat: "text-amber-600",
  },
  Assigned: {
    label: "Assigned",
    description: "An agent has been assigned and will review it shortly.",
    icon: FaUserCheck,
    badge: "bg-sky-100 text-sky-700 ring-1 ring-inset ring-sky-300",
    solid: "bg-sky-500",
    dot: "bg-sky-500",
    stat: "text-sky-600",
  },
  Accepted: {
    label: "In Progress",
    description: "The agent has accepted and is working on it.",
    icon: FaThumbsUp,
    badge: "bg-indigo-100 text-indigo-700 ring-1 ring-inset ring-indigo-300",
    solid: "bg-indigo-500",
    dot: "bg-indigo-500",
    stat: "text-indigo-600",
  },
  Completed: {
    label: "Resolved",
    description: "This complaint has been resolved.",
    icon: FaCheckCircle,
    badge: "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-300",
    solid: "bg-emerald-500",
    dot: "bg-emerald-500",
    stat: "text-emerald-600",
  },
  Rejected: {
    label: "Rejected",
    description: "This complaint was rejected by the agent.",
    icon: FaTimesCircle,
    badge: "bg-rose-100 text-rose-700 ring-1 ring-inset ring-rose-300",
    solid: "bg-rose-500",
    dot: "bg-rose-500",
    stat: "text-rose-600",
  },
};

export const DEFAULT_STATUS = STATUS_CONFIG.Pending;

export const getStatusConfig = (status) =>
  STATUS_CONFIG[status] || DEFAULT_STATUS;

// Order used for the stat cards / legends so it always reads left-to-right
// as the natural lifecycle of a complaint.
export const STATUS_ORDER = [
  "Pending",
  "Assigned",
  "Accepted",
  "Completed",
  "Rejected",
];
