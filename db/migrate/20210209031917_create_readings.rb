class CreateReadings < ActiveRecord::Migration[6.0]
  def change
    create_table :readings do |t|
      t.string :notes
      t.string :cards

      t.timestamps
    end
  end
end
