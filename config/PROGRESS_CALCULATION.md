# Build Progress Calculation

## Formula

```
Progress % = (Completed Steps / Total Steps) × 100 + Current Step Progress

Time Remaining = (Elapsed Time / Current Progress %) × (100 - Current Progress %)
```

## Example

For a 5-step build:

```
Step 1: 0-20%
Step 2: 20-40%
Step 3: 40-60%
Step 4: 60-80%
Step 5: 80-100%
```

If 3 minutes have elapsed and we're at 40% completion:
```
Time Remaining = (3 min / 0.40) × 0.60 = 4.5 minutes
```

## Update Frequency

Progress updates occur:
- After each step completes
- Every second during step execution
- When log entries are added
- Real-time based on actual file I/O
