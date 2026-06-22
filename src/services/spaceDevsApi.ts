import { SpaceDevsResponse } from '../types/launch';

export async function fetchUpcomingLaunches(): Promise<SpaceDevsResponse> {
const response = await fetch('https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5');

if (!response.ok) {
    throw new Error('Failed to fetch space launch data');
}
return response.json() as Promise<SpaceDevsResponse>;
}