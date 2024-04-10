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
		client: {"start":"_app/immutable/entry/start.-XASlR41.js","app":"_app/immutable/entry/app.BCi_yJvG.js","imports":["_app/immutable/entry/start.-XASlR41.js","_app/immutable/chunks/entry.BScMirZf.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/entry/app.BCi_yJvG.js","_app/immutable/chunks/scheduler.BvLojk_z.js","_app/immutable/chunks/index.fi1e1Nz5.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-D0RzhiHk.js')),
			__memo(() => import('./chunks/1-wouYervg.js')),
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
				endpoint: __memo(() => import('./chunks/_server-CxVCn5qM.js'))
			},
			{
				id: "/api/is_logged",
				pattern: /^\/api\/is_logged\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-DsjFNxIG.js'))
			},
			{
				id: "/api/login",
				pattern: /^\/api\/login\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server-sMhHMBTU.js'))
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
