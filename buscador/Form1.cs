using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace buscador
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public void obtenerArchivos(string dir, string query ="" )
        {
            string[] filePaths = Directory.GetFiles(dir, query ,SearchOption.AllDirectories );
            listBox1.Items.Clear();

            if( filePaths.Length == 0)
            {
                listBox1.Items.Add("archivo no encontrado, verfique su busqueda");
            }
            foreach (String file in filePaths )
            {
                listBox1.Items.Add(file);   
            }
        }

        void obtenerUnidades()
        {
            var drv = DriveInfo.GetDrives();


            foreach (DriveInfo dInfo in drv)
            {
                if (dInfo.DriveType.ToString().Equals("Removable"))
                {
                    comboBox1.Items.Add(dInfo.Name);
                }

            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            obtenerUnidades();
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            string archivoSeleccionado = comboBox1.SelectedItem.ToString();
            obtenerArchivos(archivoSeleccionado);

        }

        private void listBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            try
            {
                Process.Start(new ProcessStartInfo( listBox1.SelectedItem.ToString() ) { UseShellExecute = true });
            }
            catch( Exception ex)
            {
                Console.WriteLine( ex );
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string unidadSeleccionada = comboBox1.SelectedItem.ToString();
            string query = textBox1.Text.Trim();
            listBox2.Items.Add( query );
            obtenerArchivos(unidadSeleccionada, "*"+query+"*"); 
        }

        private void listBox2_SelectedIndexChanged(object sender, EventArgs e)
        {
            string unidadSeleccionada = comboBox1.SelectedItem.ToString();
            string query = listBox2.SelectedItem.ToString();
            try
            {
                obtenerArchivos(unidadSeleccionada, "*" + query + "*");
            }catch( Exception ex)
            {
                Console.WriteLine(ex); 
            }
        }
    }
}
