declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"comunidad": {
"actividades-comunitarias.md": {
	id: "actividades-comunitarias.md";
  slug: "actividades-comunitarias";
  body: string;
  collection: "comunidad";
  data: InferEntrySchema<"comunidad">
} & { render(): Render[".md"] };
"eventos-celebraciones.md": {
	id: "eventos-celebraciones.md";
  slug: "eventos-celebraciones";
  body: string;
  collection: "comunidad";
  data: InferEntrySchema<"comunidad">
} & { render(): Render[".md"] };
"integrantes.md": {
	id: "integrantes.md";
  slug: "integrantes";
  body: string;
  collection: "comunidad";
  data: InferEntrySchema<"comunidad">
} & { render(): Render[".md"] };
"murales-arte-publico.md": {
	id: "murales-arte-publico.md";
  slug: "murales-arte-publico";
  body: string;
  collection: "comunidad";
  data: InferEntrySchema<"comunidad">
} & { render(): Render[".md"] };
"obras-destacadas.md": {
	id: "obras-destacadas.md";
  slug: "obras-destacadas";
  body: string;
  collection: "comunidad";
  data: InferEntrySchema<"comunidad">
} & { render(): Render[".md"] };
};
"talleres": {
"bateria-percusion.md": {
	id: "bateria-percusion.md";
  slug: "bateria-percusion";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"bombo-leguero.md": {
	id: "bombo-leguero.md";
  slug: "bombo-leguero";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"canto.md": {
	id: "canto.md";
  slug: "canto";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"danza-folklorica.md": {
	id: "danza-folklorica.md";
  slug: "danza-folklorica";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"dibujo-pintura.md": {
	id: "dibujo-pintura.md";
  slug: "dibujo-pintura";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"guitarra-bajo.md": {
	id: "guitarra-bajo.md";
  slug: "guitarra-bajo";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"interpretacion-escenica.md": {
	id: "interpretacion-escenica.md";
  slug: "interpretacion-escenica";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"piano.md": {
	id: "piano.md";
  slug: "piano";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"tango.md": {
	id: "tango.md";
  slug: "tango";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"teatro.md": {
	id: "teatro.md";
  slug: "teatro";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"violin.md": {
	id: "violin.md";
  slug: "violin";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
"yoga.md": {
	id: "yoga.md";
  slug: "yoga";
  body: string;
  collection: "talleres";
  data: InferEntrySchema<"talleres">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"settings": {
"site": {
	id: "site";
  collection: "settings";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
