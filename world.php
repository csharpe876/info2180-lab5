<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = 'localhost';
$username = 'lab5_user';
$password = 'password123';
$dbname = 'world';

try {
  $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
  exit();
}

// Get the country and lookup parameters from the GET request
$country = isset($_GET['country']) ? $_GET['country'] : '';
$lookup = isset($_GET['lookup']) ? $_GET['lookup'] : '';

// Check if we're looking up cities
if ($lookup === 'cities') {
  // SQL JOIN query to get cities for the specified country
  try {
    if (!empty($country)) {
      $stmt = $conn->prepare(
        "SELECT cities.name, cities.district, cities.population 
         FROM cities 
         INNER JOIN countries ON cities.country_code = countries.code 
         WHERE countries.name LIKE :country"
      );
      $stmt->execute(['country' => "%$country%"]);
    } else {
      $stmt = $conn->query(
        "SELECT cities.name, cities.district, cities.population 
         FROM cities"
      );
    }
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  } catch (PDOException $e) {
    echo "Query Error: " . $e->getMessage();
    exit();
  }
  ?>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>District</th>
        <th>Population</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($results as $row): ?>
        <tr>
          <td><?= $row['name']; ?></td>
          <td><?= $row['district']; ?></td>
          <td><?= $row['population']; ?></td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
  <?php
} else {
  // Regular country lookup
  if (!empty($country)) {
    $stmt = $conn->prepare("SELECT * FROM countries WHERE name LIKE :country");
    $stmt->execute(['country' => "%$country%"]);
  } else {
    $stmt = $conn->query("SELECT * FROM countries");
  }
  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  ?>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Continent</th>
        <th>Independence</th>
        <th>Head of State</th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($results as $row): ?>
        <tr>
          <td><?= $row['name']; ?></td>
          <td><?= $row['continent']; ?></td>
          <td><?= $row['independence_year']; ?></td>
          <td><?= $row['head_of_state']; ?></td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
  <?php
}
?>
