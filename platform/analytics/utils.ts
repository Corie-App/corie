import { DeviceType } from './types';

export function getDeviceType(): DeviceType {
	const ua = navigator.userAgent;
	if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
		return DeviceType.TABLET;
	}
	if (
		/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)
	) {
		return DeviceType.MOBILE;
	}
	return DeviceType.DESKTOP;
}
