export const renderTemplate = (template: string, context: Record<string, string>): string =>
  template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, token: string) => context[token] ?? '');