class CreateReadings < ActiveRecord::Migration[6.0]
  def change
    create_table :readings do |t|
      t.string :notes
      # t.string :reading_cards, array: true, default: '[]'
      # t.string :name

      t.timestamps
    end
  end
end
