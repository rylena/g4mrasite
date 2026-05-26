import type { Member } from "../data/members";

const avatarCells: Record<Member["palette"], string[]> = {
  ember: ["00111100", "01122110", "11233211", "12344321", "12344321", "11233211", "01122110", "00111100"],
  signal: ["00022000", "00233200", "02344320", "23411432", "23411432", "02344320", "00233200", "00022000"],
  mint: ["00122100", "01233210", "12344321", "22311322", "22311322", "12344321", "01233210", "00122100"],
  violet: ["00033000", "00344300", "03411430", "34122143", "34122143", "03411430", "00344300", "00033000"],
  sand: ["00111100", "01222210", "12344321", "12433421", "12433421", "12344321", "01222210", "00111100"],
  red: ["00011000", "00122100", "01233210", "12344321", "12344321", "01233210", "00122100", "00011000"],
};

export function PixelAvatar({ member }: { member: Member }) {
  const cells = avatarCells[member.palette].join("").split("");

  return (
    <div className={`pixel-avatar pixel-avatar--${member.palette}`} aria-hidden="true">
      {cells.map((cell, index) => (
        <span key={`${member.username}-${index}`} data-cell={cell} />
      ))}
    </div>
  );
}
