import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware((auth, req, evt) => {
	if (isProtectedRoute(req)) auth().protect();

	const referrer = req.headers.get('referer') || req.headers.get('referrer');
	const response = NextResponse.next();

	if (referrer) {
		response.headers.set('x-custom-referrer', referrer);
	}
	return response;
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api)(.*)'],
};
