import { APPLICANT_STATUSES, type ApplicantStatus } from "@/types/applicant";

export function StatusSelector({
  value,
  onChange,
  disabled,
}: {
  value: ApplicantStatus;
  onChange: (status: ApplicantStatus) => void;
  disabled?: boolean;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">
        Update status
      </span>
      <select
        className="native-select w-full"
        value={value}
        onChange={(event) => onChange(event.target.value as ApplicantStatus)}
        disabled={disabled}
      >
        {APPLICANT_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status === "shortlisted"
              ? "Review"
              : status[0].toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
}
