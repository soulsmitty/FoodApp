import { cn, gradeColor, gradeBg } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { GradeBadge } from '@/lib/nutrition/grading';

interface HealthGradeProps {
  grade: string;
  score: number;
  label: string;
  summary: string;
  badges?: GradeBadge[];
  size?: 'sm' | 'md' | 'lg';
}

export function HealthGrade({ grade, score, label, summary, badges = [], size = 'md' }: HealthGradeProps) {
  const ringSize = { sm: 'w-10 h-10 text-lg', md: 'w-14 h-14 text-2xl', lg: 'w-20 h-20 text-3xl' }[size];
  const isS = grade === 'S';

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        {/* Grade ring */}
        <div
          className={cn(
            'grade-ring flex-shrink-0',
            ringSize,
            gradeColor(grade),
            gradeBg(grade),
            isS && 'animate-pulse-gold',
          )}
        >
          {grade}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className={cn('font-bold text-lg', gradeColor(grade))}>{label}</span>
            <span className="text-xs text-zinc-500 font-mono">{score}/110</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed mt-0.5 max-w-xs">{summary}</p>
        </div>
      </div>

      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {badges.map((b) => (
            <Badge key={b.label} type={b.type}>
              {b.label}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
