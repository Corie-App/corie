import { kv } from '@vercel/kv';
import VersionHistorySheet from './version-history-sheet';
import { RulesKvResponse } from '@/lib/types';

interface Props {
	announcementId: string;
}

type RulesResponse = RulesKvResponse['paths'] & { ts: number };

export default async function PathVersionHistory({ announcementId }: Props) {
	const rules = await kv.lrange<RulesResponse>(`rules:${announcementId}:paths:history`, 0, -1);

	return <VersionHistorySheet rules={rules} />;
}
