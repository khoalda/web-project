<?php
  class Database {
    private $host = "localhost";
    private $db_name = "bkshop";
    private $username = "root";
    private $password = "";
    protected $conn;

    public function __construct() {
        $this->conn = mysqli_connect($this->host, $this->username, $this->password,$this->db_name);
        if (!$this->conn) {
            die("Connection failed: " . mysqli_connect_error());
        }
    }

    function __destruct()
    {
        if ($this->conn) {
            mysqli_close($this->conn);
        }
    }

    public function connect() {
        $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if (!$this->conn) {
          die("Connection failed: " . mysqli_connect_error());
      }
      return $this->conn;
    }
  }
?>