import { RulesKvResponse } from '@/lib/types';
import { Button } from '@/ui/button';
import { useServerAction } from 'zsa-react';
import { restorePathRulesAction } from '../actions';
import { useParams } from 'next/navigation';

interface Props {
	rule: RulesKvResponse['paths'] & { ts: number };
	onSuccess: () => void;
}

export default function VersionCard({ rule, onSuccess }: Props) {
	const hasAllowlist = rule.allowlist.length > 0;
	const hasBlocklist = rule.blocklist.length > 0;

	const params = useParams();

	const { execute, isPending } = useServerAction(restorePathRulesAction, {
		onSuccess,
		onError(args) {
			console.error(args);
		},
	});

	return (
		<div className='space-y-4 rounded-md border border-neutral-200 px-4 py-2'>
			<div className='space-y-1'>
				Allowlist
				<p className='text-xs text-muted-foreground'>{hasAllowlist ? rule.allowlist.join(', ') : 'No paths'}</p>
			</div>
			<div className='space-y-1'>
				Blocklist
				<p className='text-xs text-muted-foreground'>{hasBlocklist ? rule.blocklist.join(', ') : 'No paths'}</p>
			</div>
			<div className='flex items-center gap-2 justify-between'>
				<p className='text-xs text-muted-foreground'>{new Date(rule.ts).toLocaleString()}</p>
				<Button
					type='button'
					variant='secondary'
					className='text-xs'
					disabled={isPending}
					onClick={() =>
						execute({
							allowlist: rule.allowlist.join(', '),
							blocklist: rule.blocklist.join(', '),
							productId: params.productId as string,
							announcementId: params.announcementId as string,
						})
					}>
					{isPending ? 'Restoring...' : 'Restore'}
				</Button>
			</div>
		</div>
	);
}
