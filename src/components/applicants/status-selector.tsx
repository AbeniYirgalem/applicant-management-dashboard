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
    <label className="block space-y-2">
      <span className="text-sm font-medium">Application status</span>
      <select
        className="h-11 w-full rounded-xl border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        value={value}
        onChange={(event) => onChange(event.target.value as ApplicantStatus)}
        disabled={disabled}
      >
        {APPLICANT_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status === "shortlisted"
              ? "Reviewing"
              : status[0].toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
}
