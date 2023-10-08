export default function connectionStatusColor(
  doorConnectionStatus: 'online' | 'offline',
) {
  return doorConnectionStatus === 'online' ? 'success.main' : 'red';
}
