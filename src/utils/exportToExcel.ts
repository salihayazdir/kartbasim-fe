import XLSX from 'xlsx';
import dayjs from 'dayjs';

type ExportToExcelProps = {
  data: Object[];
  fileName: string;
};

export default function exportToExcel({ data, fileName }: ExportToExcelProps) {
  const dateTime = dayjs().format('DD-MM-YY');

  const workBook = XLSX.utils.book_new();
  const workSheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
  XLSX.writeFile(workBook, `${fileName}_${dateTime}.xlsx`);
}
