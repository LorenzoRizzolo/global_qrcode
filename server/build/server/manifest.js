const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.CcLuLiWy.js","app":"_app/immutable/entry/app.BlyH9CI6.js","imports":["_app/immutable/entry/start.CcLuLiWy.js","_app/immutable/chunks/entry.BS8P3x6F.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.BlyH9CI6.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.fi1e1Nz5.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-D0RzhiHk.js')),
			__memo(() => import('./chunks/1-Bcy1OJxe.js')),
			__memo(() => import('./chunks/2-CuBxPdHM.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/create_qrcode",
				pattern: /^\/api\/create_qrcode\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-vKsVc8VJ.js'))
			},
			{
				id: "/api/is_logged",
				pattern: /^\/api\/is_logged\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-Be9o3J4E.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-BxCTPsrB.js'))
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
