import React from "react";
import { motion } from "motion/react";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  EyeOff,
  Zap,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

interface StatusIndicatorProps {
  status:
    | "published"
    | "draft"
    | "inactive"
    | "active"
    | "trending";
  label?: string;
  count?: number;
  className?: string;
}

export function StatusIndicator({
  status,
  label,
  count,
  className = "",
}: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "published":
        return {
          icon: <CheckCircle2 className="w-4 h-4" />,
          color:
            "bg-green-500/10 text-green-700 border-green-200",
          text: label || "Published",
          bgColor: "bg-green-50",
        };
      case "draft":
        return {
          icon: <Clock className="w-4 h-4" />,
          color:
            "bg-yellow-500/10 text-yellow-700 border-yellow-200",
          text: label || "Draft",
          bgColor: "bg-yellow-50",
        };
      case "inactive":
        return {
          icon: <EyeOff className="w-4 h-4" />,
          color: "bg-gray-500/10 text-gray-700 border-gray-200",
          text: label || "Inactive",
          bgColor: "bg-gray-50",
        };
      case "active":
        return {
          icon: <Eye className="w-4 h-4" />,
          color: "bg-blue-500/10 text-blue-700 border-blue-200",
          text: label || "Active",
          bgColor: "bg-blue-50",
        };
      case "trending":
        return {
          icon: <TrendingUp className="w-4 h-4" />,
          color: "bg-primary/10 text-primary border-primary/20",
          text: label || "Trending",
          bgColor: "bg-primary/5",
        };
      default:
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          color: "bg-gray-500/10 text-gray-700 border-gray-200",
          text: "Unknown",
          bgColor: "bg-gray-50",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge
      className={`${config.color} ${className} flex items-center space-x-1 font-medium`}
      variant="outline"
    >
      {config.icon}
      <span>{config.text}</span>
      {count !== undefined && (
        <span className="ml-1 px-1 py-0.5 bg-current/20 rounded text-xs">
          {count}
        </span>
      )}
    </Badge>
  );
}

interface ActivityIndicatorProps {
  activity: {
    type: "create" | "update" | "delete" | "view";
    title: string;
    time: string;
    author?: string;
  };
}

export function ActivityIndicator({
  activity,
}: ActivityIndicatorProps) {
  const getActivityConfig = () => {
    switch (activity.type) {
      case "create":
        return {
          icon: <Zap className="w-4 h-4" />,
          color: "text-green-600",
          bg: "bg-green-500/10",
          text: "Created",
        };
      case "update":
        return {
          icon: <CheckCircle2 className="w-4 h-4" />,
          color: "text-blue-600",
          bg: "bg-blue-500/10",
          text: "Updated",
        };
      case "delete":
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          color: "text-red-600",
          bg: "bg-red-500/10",
          text: "Deleted",
        };
      case "view":
        return {
          icon: <Users className="w-4 h-4" />,
          color: "text-purple-600",
          bg: "bg-purple-500/10",
          text: "Viewed",
        };
      default:
        return {
          icon: <Clock className="w-4 h-4" />,
          color: "text-gray-600",
          bg: "bg-gray-500/10",
          text: "Activity",
        };
    }
  };

  const config = getActivityConfig();

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors"
    >
      <div
        className={`w-8 h-8 rounded-full ${config.bg} flex items-center justify-center ${config.color}`}
      >
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-medium text-foreground">
            {activity.title}
          </p>
          <span className="text-xs text-muted-foreground">
            {activity.time}
          </span>
        </div>
        <div className="flex items-center space-x-2 mt-1">
          <Badge variant="secondary" className="text-xs">
            {config.text}
          </Badge>
          {activity.author && (
            <span className="text-xs text-muted-foreground">
              by {activity.author}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down" | "neutral";
  };
  icon: React.ReactNode;
  color?: "primary" | "blue" | "green" | "purple" | "orange";
}

export function MetricCard({
  title,
  value,
  change,
  icon,
  color = "primary",
}: MetricCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case "blue":
        return "bg-blue-500/10 text-blue-600";
      case "green":
        return "bg-green-500/10 text-green-600";
      case "purple":
        return "bg-purple-500/10 text-purple-600";
      case "orange":
        return "bg-orange-500/10 text-orange-600";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getTrendColor = () => {
    if (!change) return "";
    switch (change.trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-md"></Card>
  );
}