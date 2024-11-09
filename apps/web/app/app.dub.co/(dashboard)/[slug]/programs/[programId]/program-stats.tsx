import usePartnersCount from "@/lib/swr/use-partners-count";
import { Icon } from "@dub/ui";
import { Check2, CurrencyDollar, MoneyBills2, Users } from "@dub/ui/src/icons";
import { nFormatter } from "@dub/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export function ProgramStats() {
  // TODO: [payouts] Use actual data
  const revenue = 120000;
  const revenueError = false;

  // TODO: [payouts] Use actual data
  const totalPayouts = 24000;
  const totalPayoutsError = false;

  const { partnersCount, error: partnersCountError } = usePartnersCount();

  // TODO: [payouts] Use actual data
  const sales = 2500;
  const salesError = false;

  return (
    <div className="grid grid-cols-1 divide-neutral-200 rounded-lg border border-neutral-200 max-md:divide-y md:grid-cols-4 md:divide-x">
      <Stat
        icon={CurrencyDollar}
        label="Revenue"
        value={revenue}
        tab="sales"
        error={revenueError}
        isCurrency
      />
      <Stat
        icon={MoneyBills2}
        label="Payouts"
        tab="payouts"
        value={totalPayouts}
        error={totalPayoutsError}
        isCurrency
      />
      <Stat
        icon={Users}
        label="Partners"
        tab="partners"
        value={partnersCount?.all}
        error={partnersCountError}
      />
      <Stat
        icon={Check2}
        label="Sales"
        tab="sales"
        value={sales}
        error={salesError}
      />
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  tab,
  error,
  isCurrency = false,
}: {
  icon: Icon;
  label: string;
  value: number | undefined;
  tab: string;
  error: boolean;
  isCurrency?: boolean;
}) {
  const { slug, programId } = useParams();
  const isLoading = value === undefined && !error;

  return (
    <Link
      href={`/${slug}/programs/${programId}/${tab}`}
      className="flex flex-row items-center gap-x-4 gap-y-5 p-3 transition-colors hover:bg-neutral-50 md:flex-col md:items-start lg:p-5"
    >
      <div className="flex size-10 items-center justify-center rounded-md bg-neutral-100">
        <Icon className="size-4 text-neutral-900" />
      </div>
      <div className="w-full">
        <div className="text-sm text-neutral-500">{label}</div>
        {isLoading ? (
          <div className="h-7 w-24 animate-pulse rounded-md bg-neutral-200 md:mt-2 md:h-8 lg:h-9" />
        ) : (
          <div className="truncate text-xl text-neutral-800 md:mt-2 md:text-2xl lg:text-3xl">
            {error ? (
              "-"
            ) : (
              <>
                {isCurrency && "$"}
                {nFormatter(value)}
              </>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
