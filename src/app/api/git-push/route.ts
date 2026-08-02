import { NextResponse } from "next/server";
import { execSync } from "child_process";

export async function GET() {
  const cwd = process.cwd();
  const logs: string[] = [];

  const run = (cmd: string) => {
    try {
      const out = execSync(cmd, { cwd, encoding: "utf-8" });
      logs.push(`[OK] ${cmd}: ${out.trim()}`);
    } catch (err: any) {
      logs.push(`[ERR] ${cmd}: ${err.stdout || err.stderr || err.message}`);
    }
  };

  run("git init");
  run("git remote remove origin");
  run("git remote add origin https://github.com/imran15-9136/hope-global-academy.git");
  run("git add .");
  run('git commit -m "feat: complete Hope Global Academy single-page platform and admin dashboard"');
  run("git branch -M main");
  run("git push -u origin main");

  return NextResponse.json({ success: true, logs });
}
